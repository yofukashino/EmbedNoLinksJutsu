import { FormItem, SelectItem, TextInput } from "replugged/components";
import { PluginLogger, SettingValues } from "../index";
import { defaultSettings } from "../lib/consts";
import Utils from "../lib/utils";
import Types from "../types";
export const registerSettings = (): void => {
  for (const key in defaultSettings) {
    if (SettingValues.has(key as keyof Types.Settings)) return;
    PluginLogger.log(`Adding new setting ${key} with value ${defaultSettings[key]}.`);
    SettingValues.set(key as keyof Types.Settings, defaultSettings[key]);
  }
};

export const Settings = () => {
  return (
    <div>
      <SelectItem
        note="Default Behaviour for links in messages."
        options={[
          { label: "Hide link", value: "hide" },
          { label: "Show Alt Text When Not hidden", value: "showAlt" },
          { label: "Show Alt Text instead of Hiding link", value: "useAltInstead" },
        ]}
        {...Utils.useSetting(SettingValues, "defaultBehaviour", defaultSettings.defaultBehaviour)}>
        Default Link Behavior
      </SelectItem>
      <FormItem
        title="Alt Text"
        note={"The text to show instead of link according to your preference. (Accepts Regex)"}
        style={{ marginBottom: 20 }}
        divider={true}>
        <TextInput
          disabled={
            SettingValues.get("defaultBehaviour", defaultSettings.defaultBehaviour) === "hide"
          }
          placeholder="Default: Host Name"
          {...Utils.useSetting(SettingValues, "alt", defaultSettings.alt)}
        />
      </FormItem>
    </div>
  );
};

export default { registerSettings, Settings };
