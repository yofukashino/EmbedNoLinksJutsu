import { webpack } from "replugged";
import { PluginInjectorUtils, PluginLogger, ShownMessageStateIds } from "../index";
import Modules from "../lib/requiredModules";
import Icons from "../Components/Icons";
import Utils from "../lib/utils";
import Types from "../types";
export default (): void => {
  const generateContent = webpack.getFunctionBySource<Types.MessageContentGenertor["default"]>(
    Modules.MessageContentGenertor,
    ".formatInline?",
  );

  PluginInjectorUtils.addPopoverButton((message: Types.Message) => {
    if (generateContent(message)?.content?.length && message?.embeds?.length)
      return {
        id: "embed-links",
        key: "embed-links",
        label: `${ShownMessageStateIds.has(message.id) ? "Hide Links" : "Show Links"}`,
        icon: () =>
          ShownMessageStateIds.has(message.id) ? (
            <Icons.linkDismiss width="22" height="22" />
          ) : (
            <Icons.link width="22" height="22" />
          ),
        onClick: () => {
          try {
            if (ShownMessageStateIds.has(message.id)) {
              ShownMessageStateIds.delete(message.id);
            } else {
              ShownMessageStateIds.add(message.id);
            }
            Utils.rerenderMessage(message);
          } catch (err) {
            //私の闘争
            PluginLogger.error(err);
          }
        },
      };
    return null;
  });
};
