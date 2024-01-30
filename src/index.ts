import { Injector, Logger } from "replugged";
export const PluginInjector = new Injector();
export const { utils: PluginInjectorUtils } = PluginInjector;
export const PluginLogger = Logger.plugin("EmbedNoLinksJutsu", "#b380ff");
export const ShownMessageStateIds = new Set<string>();
import Injections from "./patches/index";

export const start = (): void => {
  PluginLogger.log("「秘術 隠された存在」");
  Injections.applyInjections();
};

export const stop = (): void => {
  PluginLogger.log("私の闘争");
  PluginInjector.uninjectAll();
};
