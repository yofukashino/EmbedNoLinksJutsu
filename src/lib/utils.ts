import { util } from "replugged";
import { PluginInjector, PluginLogger, SettingValues } from "../index";
import { defaultSettings } from "./consts";
import Types from "../types";

export const forceRerenderElement = async (selector: string): Promise<void> => {
  try {
    const element = await util.waitFor(selector);
    if (!element) return;
    const ownerInstance = util.getOwnerInstance(element);
    const unpatchRender = PluginInjector.instead(ownerInstance, "render", () => {
      unpatchRender();
      return null;
    });
    ownerInstance.forceUpdate(() => ownerInstance.forceUpdate(() => {}));
  } catch (err) {
    //私の闘争
    PluginLogger.error(err);
  }
};
export const rerenderMessage = (message: Types.Message): void => {
  void forceRerenderElement(
    `[data-list-item-id="chat-messages___chat-messages-${message.channel_id}-${message.id}"]`,
  );
};

export const replaceAlt = (replacement: string, string: string): string => {
  if (replacement.startsWith("/") && replacement.endsWith("/")) {
    try {
      const pattern = replacement.slice(1, -1);
      const regex = new RegExp(pattern);
      const match = string.match(regex);
      return match?.[0];
    } catch {
      return replacement;
    }
  }
  return replacement;
};

export const linkFilter = (
  message: Types.Message,
  array: React.ReactElement[],
  alt?: boolean,
): React.ReactElement[] =>
  //秘術 隠された存在」
  array.reduce((acc, children: Types.ReactTree) => {
    const subFilter = (url?: string): boolean =>
      children?.props?.href?.includes(url) ||
      children?.props?.href
        ?.replace(
          /^https:\/\/.*youtu.be\/|https:\/\/.*youtube.com\/shorts\//,
          "https://www.youtube.com/watch?v=",
        )
        ?.includes(url) ||
      children?.props?.href
        ?.replace(
          /^https:\/\/.*youtu.be\/|https:\/\/.*youtube.com\/shorts\//,
          "https://www.youtube.com/watch?v=",
        )
        ?.includes(
          url?.replace(
            /^https:\/\/.*youtu.be\/|https:\/\/.*youtube.com\/shorts\//,
            "https://www.youtube.com/watch?v=",
          ),
        );
    if (Array.isArray(children)) {
      const filteredSubarray = linkFilter(message, children, alt);
      acc.push(...filteredSubarray);
    } else if (
      (alt &&
        message?.embeds?.some((embed) => subFilter(embed?.image?.url) || subFilter(embed?.url))) ||
      !message?.embeds?.some((embed) => subFilter(embed?.image?.url) || subFilter(embed?.url)) ||
      subFilter(children?.props?.title?.match(/[\s.]+?\((.+?)\)/)?.[1])
    ) {
      const span = util.findInReactTree(
        children,
        (c: Types.ReactTree) => c?.type === "span" && typeof c?.props?.children === "string",
      ) as Types.ReactTree;
      if (alt && children.props.href && span) {
        try {
          const { host } = new URL(span.props.children);
          const replacement = SettingValues.get("alt", defaultSettings.alt);
          span.props.children = replacement ? replaceAlt(replacement, span.props.children) : host;
        } catch {}
      }
      acc.push(children);
    }
    return acc;
  }, []);

export default { ...util, forceRerenderElement, rerenderMessage, linkFilter };
