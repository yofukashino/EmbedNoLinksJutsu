import { webpack } from "replugged";
import { parser as Parser } from "replugged/common";
import { PluginInjector, PluginLogger, SettingValues, ShownMessageStateIds } from "../index";
import { defaultSettings } from "../lib/consts";
import Modules from "../lib/requiredModules";
import Utils from "../lib/utils";
import Types from "../types";

export default (): void => {
  const ContentMemo = webpack.getExportsForProps<Types.MessageContent["default"]>(
    Modules.MessageContent,
    ["type", "compare"],
  );

  PluginInjector.before(ContentMemo, "type", (args) => {
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
        props.content = Parser.parse("Click to see attachment");
    } catch (err) {
      //私の闘争
      PluginLogger.error(err);
    }

    return args;
  });
};
