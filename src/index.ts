import { Injector, Logger } from "replugged";
export const PluginInjector = new Injector();
export const { utils: PluginInjectorUtils } = PluginInjector;
export const PluginLogger = Logger.plugin("EmbedNoLinksJutsu", "#b380ff");
export const ShownMessageStateIds = new Set<string>();
import Injections from "./patches/index";

export const start = (): void => {
  Injections.applyInjections();
};

export const stop = (): void => {
  PluginInjector.uninjectAll();
};
