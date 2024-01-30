import { PluginInjector, PluginLogger, ShownMessageStateIds } from "../index";
import { MessageContent } from "../lib/requiredModules";
import Utils from "../lib/utils";

export default (): void => {
  PluginInjector.before(MessageContent.default, "type", (args) => {
    const [props] = args;
    if (ShownMessageStateIds.has(props?.message?.id)) return args;
    if (!Array.isArray(props.content)) props.content = [props.content];
    try {
      props.content = Utils.linkFilter(props.message, props.content);
      console.log(...props.content);
    } catch (error) {
      PluginLogger.error(error);
    }

    return args;
  });
};
