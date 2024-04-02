import { util } from "replugged";
import { PluginInjector, PluginLogger } from "..";
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
export const linkFilter = (
  message: Types.Message,
  array: React.ReactElement[],
): React.ReactElement[] =>
  //秘術 隠された存在」
  array.reduce((acc, children) => {
    if (Array.isArray(children)) {
      const filteredSubarray = linkFilter(message, children);
      acc.push(...filteredSubarray);
    } else if (
      !message?.embeds?.some(
        (embed) =>
          children?.props?.href?.includes(embed?.image?.url) ||
          children?.props?.href?.includes(embed?.url) ||
          children?.props?.href
            ?.replace(
              /^https:\/\/.*youtu.be\/|https:\/\/.*youtube.com\/shorts\//,
              "https://www.youtube.com/watch?v=",
            )
            ?.includes(embed?.url) ||
          children?.props?.href
            ?.replace(
              /^https:\/\/.*youtu.be\/|https:\/\/.*youtube.com\/shorts\//,
              "https://www.youtube.com/watch?v=",
            )
            ?.includes(
              embed?.url?.replace(
                /^https:\/\/.*youtu.be\/|https:\/\/.*youtube.com\/shorts\//,
                "https://www.youtube.com/watch?v=",
              ),
            ),
      )
    ) {
      acc.push(children);
    }
    return acc;
  }, []);

export default { ...util, forceRerenderElement, rerenderMessage, linkFilter };
