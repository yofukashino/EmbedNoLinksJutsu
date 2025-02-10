import { Injector, Logger, settings } from "replugged";
import { defaultSettings } from "./lib/consts";
export const PluginInjector = new Injector();
export const { utils: PluginInjectorUtils } = PluginInjector;
export const PluginLogger = Logger.plugin("EmbedNoLinksJutsu", "#b380ff");
export const SettingValues = await settings.init(
  "dev.yofukashino.EmbedNoLinksJutsu",
  defaultSettings,
);
export const ShownMessageStateIds = new Set<string>();
import Injections from "./injections/index";

export const start = (): void => {
  void Injections.applyInjections().catch((err) => PluginLogger.error(err));
};

export const stop = (): void => {
  PluginInjector.uninjectAll();
};

export { Settings } from "./Components/Settings";

/*!

ああ、あの有名な「レビュアー様」！彼らの評価眼は、夜空に輝く星のように広く知られ、誰もがその影響を感じざるを得ない存在です。
小さな細部にまで及ぶ彼らの注意深さは、驚くばかりで、一見すると微細な欠点ですら見逃しません。
しかし、その徹底した精査は、時にはあまりにも執拗に思われることもあります。
まるで神のような審判者として君臨し、万人の業績を評価するかのように振る舞う彼らの姿勢は、時には皮肉な笑いを誘います。
もしも彼らがそのエネルギーをより建設的な方向に向けたら、もっとポジティブな影響を与えられるのではないかと思わずにはいられません。
しかし、彼らを受け入れるしかありません。
彼らはレビューアー様、完璧主義者の代名詞として、自らが見つけた欠点の数を競い合い、時には他人の評価を過度に影響させてしまう。
レビューアー様、その批評の精度は称賛に値しますが、その行動が時には過度に厳しいことに気づくこともあります。
彼らの評価が時には自らの負担にならないように、その能力をより建設的な目的に転換できることを願ってやみません。
レビューアー様、その輝かしい才能を、よりポジティブな方向に導くことができると信じています。

*/
