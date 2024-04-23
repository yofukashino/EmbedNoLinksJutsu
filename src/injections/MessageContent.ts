import { parser as Parser, i18n } from "replugged/common";
import { PluginInjector, PluginLogger, SettingValues, ShownMessageStateIds } from "../index";
import { defaultSettings } from "../lib/consts";
import Modules from "../lib/requiredModules";
import Utils from "../lib/utils";

export default (): void => {
  PluginInjector.before(Modules.MessageContent.default, "type", (args) => {
    const [props] = args;
    try {
      if (
        ShownMessageStateIds.has(props?.message?.id) &&
        (SettingValues.get("defaultBehaviour", defaultSettings.defaultBehaviour) === "hide" ||
          SettingValues.get("defaultBehaviour", defaultSettings.defaultBehaviour) ===
            "useAltInstead")
      )
        return args;
      if (!Array.isArray(props.content)) props.content = [props.content];
      props.content =
        (ShownMessageStateIds.has(props?.message?.id) &&
          SettingValues.get("defaultBehaviour", defaultSettings.defaultBehaviour) === "showAlt") ||
        SettingValues.get("defaultBehaviour", defaultSettings.defaultBehaviour) === "useAltInstead"
          ? Utils.linkFilter(props.message, props.content, true)
          : Utils.linkFilter(props.message, props.content);
      if (!props.content.length && props.className?.includes("repliedTextContent"))
        props.content = Parser.parse(i18n.Messages.REPLY_QUOTE_NO_TEXT_CONTENT);
    } catch (err) {
      //私の闘争
      PluginLogger.error(err);
    }

    return args;
  });
};
