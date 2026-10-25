import { Tabs } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';

import { colors, fonts } from '../../theme';

function iconColor(color: unknown): string {
  return typeof color === 'string' ? color : colors.primary;
}

export default function TabsLayout() {
  const { t } = useTranslation();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        tabBarLabelStyle: { fontFamily: fonts.semiBold, fontSize: 11 },
        // Floating pill dock, matching the Stitch Home bottom navigation.
        tabBarStyle: {
          position: 'absolute',
          bottom: 12,
          left: 16,
          right: 16,
          height: 64,
          borderRadius: 32,
          backgroundColor: 'rgba(255,255,255,0.92)',
          borderWidth: 1,
          borderColor: 'rgba(255,255,255,0.85)',
          shadowColor: colors.primary,
          shadowOpacity: 0.16,
          shadowRadius: 20,
          shadowOffset: { width: 0, height: 8 },
          elevation: 8,
          paddingBottom: 6,
          paddingTop: 6,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t('nav.home'),
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home' : 'home-outline'} color={iconColor(color)} size={focused ? 28 : 24} />
          ),
        }}
      />
      <Tabs.Screen
        name="marketplace"
        options={{
          title: t('nav.marketplace'),
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'storefront' : 'storefront-outline'} color={iconColor(color)} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: t('nav.farmerProfile'),
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'person' : 'person-outline'} color={iconColor(color)} size={24} />
          ),
        }}
      />
    </Tabs>
  );
}
