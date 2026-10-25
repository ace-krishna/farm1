import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { SUPPORTED_LANGUAGES, type LanguageCode } from '../i18n';
import { colors, fonts } from '../theme';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  return (
    <View style={styles.row}>
      {SUPPORTED_LANGUAGES.map((lang) => {
        const active = i18n.language === lang.code;
        return (
          <Pressable
            key={lang.code}
            onPress={() => void i18n.changeLanguage(lang.code as LanguageCode)}
            style={[styles.button, active && styles.activeButton]}
            accessibilityRole="button"
            accessibilityLabel={lang.label}
          >
            <Text style={[styles.label, active && styles.activeLabel]}>{lang.short}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    backgroundColor: colors.surfaceContainer,
    borderRadius: 999,
    padding: 4,
    alignItems: 'center',
  },
  button: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999 },
  activeButton: { backgroundColor: colors.primary },
  label: { fontFamily: fonts.semiBold, fontSize: 12, color: colors.muted },
  activeLabel: { color: '#fff', fontFamily: fonts.bold },
});
