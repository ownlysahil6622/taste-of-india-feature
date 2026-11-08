import {
  useNavigation,
  type NavigationProp,
  type ParamListBase,
} from '@react-navigation/native';
import React, { memo, useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Fonts } from '../../../../../styles/constants/Constants';
import { NOVA_SIDE_PADDING } from '../../../constants/layout';
import { TASTE_OF_INDIA_ROUTE_NAME } from '../../../../TasteOfIndia';
import { TasteOfIndiaImage } from '../../../../TasteOfIndia/ui/components/TasteOfIndiaImage';
import type { NovaComponentProps } from '../../../registry/types';
import { NovaPressable } from '../../common/NovaPressable';
import {
  TASTE_OF_INDIA_INGRESS_HEIGHT,
  TASTE_OF_INDIA_INGRESS_RADIUS,
  TASTE_OF_INDIA_INGRESS_VERTICAL_GAP,
} from '../constants';
import type { TasteOfIndiaIngressRow } from '../types';

const PREVIEW_DISH_KEYS = ['a195f.png', '354f0.png', '6f41c.png'];

export const TasteOfIndiaIngressComponent: React.FC<
  NovaComponentProps<TasteOfIndiaIngressRow>
> = memo(function TasteOfIndiaIngressComponent() {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const handlePress = useCallback(() => {
    navigation.navigate(TASTE_OF_INDIA_ROUTE_NAME);
  }, [navigation]);

  return (
    <View style={styles.host}>
      <NovaPressable
        style={styles.card}
        onPress={handlePress}
        accessibilityRole="button"
        accessibilityLabel="Taste of India"
      >
        <View style={styles.copy}>
          <Text style={styles.title}>Taste of India</Text>
          <Text style={styles.subtitle}>Explore cuisines by state</Text>
        </View>
        <View style={styles.previews}>
          {PREVIEW_DISH_KEYS.map((assetKey, index) => (
            <View
              key={assetKey}
              style={[styles.preview, index > 0 ? styles.previewOverlap : null]}
            >
              <TasteOfIndiaImage
                assetKey={assetKey}
                resizeMode="cover"
                style={StyleSheet.absoluteFill}
              />
            </View>
          ))}
        </View>
        <Text style={styles.chevron}>›</Text>
      </NovaPressable>
    </View>
  );
});

const styles = StyleSheet.create({
  host: {
    paddingHorizontal: NOVA_SIDE_PADDING,
    paddingVertical: TASTE_OF_INDIA_INGRESS_VERTICAL_GAP,
  },
  card: {
    height: TASTE_OF_INDIA_INGRESS_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: TASTE_OF_INDIA_INGRESS_RADIUS,
    backgroundColor: '#FFF7FB',
  },
  copy: { flex: 1 },
  title: {
    fontFamily: Fonts.FigtreeSemiBold,
    fontSize: 20,
    color: '#9A0040',
  },
  subtitle: {
    fontFamily: Fonts.FigtreeMedium,
    fontSize: 12,
    color: '#5D5D5D',
  },
  previews: { flexDirection: 'row', alignItems: 'center' },
  preview: {
    width: 40,
    height: 40,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    borderRadius: 20,
    backgroundColor: '#FFB3D6',
  },
  previewOverlap: { marginLeft: -12 },
  chevron: {
    marginLeft: 8,
    fontFamily: Fonts.FigtreeMedium,
    fontSize: 24,
    color: '#949494',
  },
});
