import { useEffect, useRef, useState } from 'react';
import { Image, Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';

import { DEMO_ANIMALS } from '../data/animals';
import { colors, fonts, type Animal } from '../theme';

export type ScanMode = 'camera' | 'gallery';

type Props = {
  visible: boolean;
  mode: ScanMode | null;
  onClose: () => void;
  onSelectAnimal: (animal: Animal, mode: ScanMode) => void;
  onSelectNew: (mode: ScanMode) => void;
};

export default function AnimalSelectSheet({ visible, mode, onClose, onSelectAnimal, onSelectNew }: Props) {
  const { t } = useTranslation();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const closeAndReset = () => {
    if (timer.current) clearTimeout(timer.current);
    setSelectedId(null);
    setFeedback(null);
    onClose();
  };

  const pickAnimal = (animal: Animal) => {
    if (!mode) return;
    setSelectedId(animal.id);
    setFeedback(mode === 'camera' ? t('scan.startingCamera') : t('scan.openingGallery'));
    timer.current = setTimeout(() => {
      const currentMode = mode;
      closeAndReset();
      onSelectAnimal(animal, currentMode);
    }, 950);
  };

  const pickNew = () => {
    if (!mode) return;
    setFeedback(mode === 'camera' ? t('scan.startingCamera') : t('scan.openingGallery'));
    timer.current = setTimeout(() => {
      const currentMode = mode;
      closeAndReset();
      onSelectNew(currentMode);
    }, 950);
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={closeAndReset}>
      <View style={styles.overlay}>
        <Pressable style={styles.backdrop} onPress={closeAndReset} accessibilityLabel="Close" />
        <View style={styles.sheet}>
          <Pressable style={styles.handle} onPress={closeAndReset}>
            <View style={styles.handleBar} />
          </Pressable>
          <View style={styles.header}>
            <View>
              <Text style={styles.ready}>
                <Ionicons name="camera" size={14} color={colors.primary} /> {t('scan.aiCameraReady')}
              </Text>
              <Text style={styles.title}>{t('scan.selectAnimal')}</Text>
            </View>
            <Pressable style={styles.closeButton} onPress={closeAndReset} accessibilityLabel="Close dialog">
              <Ionicons name="close" size={20} color={colors.muted} />
            </Pressable>
          </View>
          <ScrollView contentContainerStyle={styles.content}>
            <Text style={styles.body}>{t('scan.chooseFrom')}</Text>
            <View style={styles.grid}>
              {DEMO_ANIMALS.map((animal) => {
                const selected = selectedId === animal.id;
                return (
                  <Pressable
                    key={animal.id}
                    style={[styles.animalCard, selected && styles.animalCardSelected]}
                    onPress={() => pickAnimal(animal)}
                  >
                    <View style={[styles.avatar, selected && styles.avatarSelected]}>
                      {animal.image ? (
                        <Image source={animal.image} style={styles.avatarImage} />
                      ) : (
                        <Text style={styles.avatarText}>{animal.initials}</Text>
                      )}
                    </View>
                    <Text style={styles.animalName}>{animal.name}</Text>
                    <Text style={styles.animalSub}>
                      {animal.breed} • {animal.tag}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>{t('scan.or')}</Text>
              <View style={styles.dividerLine} />
            </View>
            <Pressable style={styles.newCard} onPress={pickNew}>
              <View style={styles.newIcon}>
                <Ionicons name="camera" size={24} color={colors.primary} />
              </View>
              <View style={styles.newText}>
                <Text style={styles.newTitle}>{t('scan.scanNew')}</Text>
                <Text style={styles.body}>{t('scan.scanNewDesc')}</Text>
              </View>
              <Ionicons name="arrow-forward" size={20} color={colors.primary} />
            </Pressable>
            {feedback ? (
              <View style={styles.feedback}>
                <Text style={styles.feedbackText}>{feedback}</Text>
                <Text style={styles.feedbackBadge}>Ready</Text>
              </View>
            ) : null}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, justifyContent: 'flex-end' },
  backdrop: { position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(0,0,0,0.6)' },
  sheet: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    maxHeight: '85%',
    paddingBottom: 24,
  },
  handle: { alignItems: 'center', paddingTop: 12, paddingBottom: 4 },
  handleBar: { width: 40, height: 6, borderRadius: 3, backgroundColor: colors.border },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  ready: { fontFamily: fonts.semiBold, fontSize: 12, color: colors.primary, textTransform: 'uppercase', letterSpacing: 0.5 },
  title: { fontFamily: fonts.bold, fontSize: 17, color: colors.text, marginTop: 2 },
  closeButton: { width: 32, height: 32, borderRadius: 16, backgroundColor: colors.surfaceContainer, alignItems: 'center', justifyContent: 'center' },
  content: { padding: 16, gap: 12 },
  body: { fontFamily: fonts.regular, fontSize: 14, color: colors.muted, lineHeight: 20 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  animalCard: {
    width: '30%',
    alignItems: 'center',
    padding: 10,
    borderRadius: 16,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  animalCardSelected: { borderColor: colors.primary, borderWidth: 2, backgroundColor: colors.primaryFixed },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.animalAvatar,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  avatarSelected: { borderWidth: 2, borderColor: colors.primary },
  avatarImage: { width: '100%', height: '100%' },
  avatarText: { fontFamily: fonts.extraBold, fontSize: 22, color: '#fff' },
  animalName: { fontFamily: fonts.bold, fontSize: 14, color: colors.text, marginTop: 6 },
  animalSub: { fontFamily: fonts.regular, fontSize: 11, color: colors.muted },
  divider: { flexDirection: 'row', alignItems: 'center', gap: 12, marginVertical: 4 },
  dividerLine: { flex: 1, height: 1, backgroundColor: colors.border },
  dividerText: { fontFamily: fonts.semiBold, fontSize: 12, color: colors.muted, textTransform: 'uppercase', letterSpacing: 0.5 },
  newCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
    borderRadius: 16,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: colors.primary,
  },
  newIcon: { width: 48, height: 48, borderRadius: 24, backgroundColor: colors.primaryFixed, alignItems: 'center', justifyContent: 'center' },
  newText: { flex: 1 },
  newTitle: { fontFamily: fonts.bold, fontSize: 16, color: colors.text },
  feedback: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: colors.primary, borderRadius: 12, padding: 12 },
  feedbackText: { fontFamily: fonts.semiBold, fontSize: 14, color: '#fff' },
  feedbackBadge: { fontFamily: fonts.bold, fontSize: 12, color: '#fff', backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 999 },
});
