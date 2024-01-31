import { PluginInjector, PluginLogger, ShownMessageStateIds } from "../index";
import { MessageContent } from "../lib/requiredModules";
import Utils from "../lib/utils";

export default (): void => {
  PluginInjector.before(MessageContent.default, "type", (args) => {
    const [props] = args;
    try {
      if (ShownMessageStateIds.has(props?.message?.id)) return args;
      if (!Array.isArray(props.content)) props.content = [props.content];

      props.content = Utils.linkFilter(props.message, props.content);
    } catch (err) {
      PluginLogger.error(`私の闘争: ${err}`);
    }

    return args;
  });
};
