import { util } from "replugged";
import { PluginInjector } from "..";
import Types from "../types";
export const forceRerenderElement = async (selector: string): Promise<void> => {
  const element = await util.waitFor(selector);
  if (!element) return;
  const ownerInstance = util.getOwnerInstance(element);
  const unpatchRender = PluginInjector.instead(ownerInstance, "render", () => {
    unpatchRender();
    return null;
  });
  ownerInstance.forceUpdate(() => ownerInstance.forceUpdate(() => {}));
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
  array.reduce((acc, children) => {
    if (Array.isArray(children)) {
      const filteredSubarray = linkFilter(message, children);
      acc.push(...filteredSubarray);
    } else if (!message?.embeds?.some((embed) => embed?.url == children?.props?.href)) {
      acc.push(children);
    }
    return acc;
  }, []);

export default { ...util, forceRerenderElement, rerenderMessage, linkFilter };
