import React, { memo } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { tasteOfIndiaRestaurantItems } from '../../data/tasteOfIndiaRestaurantItems';
import { TASTE_OF_INDIA_COLORS, TASTE_OF_INDIA_FONTS } from '../../constants';
import { TasteOfIndiaImage } from './TasteOfIndiaImage';
import { TasteOfIndiaText } from './TasteOfIndiaText';

export const TasteOfIndiaRestaurantCard = memo(
  function TasteOfIndiaRestaurantCard() {
    return (
      <View style={styles.card}>
        <View style={styles.header}>
          <View>
            <TasteOfIndiaText style={styles.offer}>
              <TasteOfIndiaText style={styles.offerDot}>●</TasteOfIndiaText>{' '}
              10-30% Lower
            </TasteOfIndiaText>
            <TasteOfIndiaText style={styles.name}>
              The Rameshwaram Cafe
            </TasteOfIndiaText>
            <View style={styles.meta}>
              <TasteOfIndiaText style={styles.rating}>★ 4.4</TasteOfIndiaText>
              <TasteOfIndiaText style={styles.metaText}>
                (12k+)
              </TasteOfIndiaText>
              <View style={styles.metaSeparator} />
              <TasteOfIndiaText style={styles.metaText}>
                31 mins
              </TasteOfIndiaText>
            </View>
          </View>
          <TasteOfIndiaText style={styles.arrow}>→</TasteOfIndiaText>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.menu}
        >
          {tasteOfIndiaRestaurantItems.map(item => (
            <View key={item.name} style={styles.menuItem}>
              <View style={styles.menuImage}>
                <TasteOfIndiaImage
                  assetKey={item.imageKey}
                  resizeMode="cover"
                  style={StyleSheet.absoluteFill}
                />
                {item.badge ? (
                  <View style={styles.menuBadge}>
                    <TasteOfIndiaText style={styles.menuBadgeText}>
                      {item.badge}
                    </TasteOfIndiaText>
                  </View>
                ) : null}
                <Pressable style={styles.addButton} accessibilityRole="button">
                  <TasteOfIndiaText style={styles.addText}>
                    Add
                  </TasteOfIndiaText>
                </Pressable>
              </View>
              <TasteOfIndiaText style={styles.menuName}>
                <TasteOfIndiaText style={styles.menuVeg}>▣</TasteOfIndiaText>{' '}
                {item.name}
              </TasteOfIndiaText>
              <View style={styles.price}>
                <TasteOfIndiaText style={styles.priceText}>
                  {item.price}
                </TasteOfIndiaText>
              </View>
              <TasteOfIndiaText style={styles.otherApps}>
                Other Apps: ₹120-₹140
              </TasteOfIndiaText>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: TASTE_OF_INDIA_COLORS.border,
    borderRadius: 16,
    backgroundColor: TASTE_OF_INDIA_COLORS.white,
  },
  header: {
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  offer: {
    fontFamily: TASTE_OF_INDIA_FONTS.medium,
    fontSize: 14,
    lineHeight: 20,
    color: TASTE_OF_INDIA_COLORS.textSecondary,
  },
  offerDot: { color: TASTE_OF_INDIA_COLORS.ratingDot },
  name: {
    marginTop: 4,
    fontFamily: TASTE_OF_INDIA_FONTS.bold,
    fontSize: 16,
    lineHeight: 24,
    color: TASTE_OF_INDIA_COLORS.textPrimary,
  },
  meta: { flexDirection: 'row', gap: 4, alignItems: 'center' },
  rating: {
    fontFamily: TASTE_OF_INDIA_FONTS.semiBold,
    fontSize: 12,
    lineHeight: 16,
    color: TASTE_OF_INDIA_COLORS.success,
  },
  metaText: {
    fontFamily: TASTE_OF_INDIA_FONTS.medium,
    fontSize: 12,
    lineHeight: 16,
    color: TASTE_OF_INDIA_COLORS.textSecondary,
  },
  metaSeparator: {
    width: 1,
    height: 14,
    marginHorizontal: 4,
    backgroundColor: TASTE_OF_INDIA_COLORS.separator,
  },
  arrow: { fontSize: 22, color: TASTE_OF_INDIA_COLORS.textMuted },
  menu: { gap: 12, paddingHorizontal: 12, paddingBottom: 14 },
  menuItem: { width: 130 },
  menuImage: {
    width: 130,
    height: 128,
    overflow: 'hidden',
    borderRadius: 16,
    backgroundColor: TASTE_OF_INDIA_COLORS.imagePlaceholder,
  },
  menuBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderRadius: 8,
    backgroundColor: TASTE_OF_INDIA_COLORS.white,
  },
  menuBadgeText: {
    fontFamily: TASTE_OF_INDIA_FONTS.regular,
    fontSize: 10,
    color: TASTE_OF_INDIA_COLORS.textSecondary,
  },
  addButton: {
    position: 'absolute',
    right: 8,
    bottom: 8,
    minWidth: 66,
    paddingVertical: 8,
    paddingHorizontal: 14,
    alignItems: 'center',
    borderRadius: 999,
    backgroundColor: TASTE_OF_INDIA_COLORS.brand,
  },
  addText: {
    fontFamily: TASTE_OF_INDIA_FONTS.medium,
    fontSize: 14,
    color: TASTE_OF_INDIA_COLORS.white,
  },
  menuName: {
    minHeight: 40,
    marginTop: 8,
    fontFamily: TASTE_OF_INDIA_FONTS.semiBold,
    fontSize: 14,
    lineHeight: 20,
    color: TASTE_OF_INDIA_COLORS.textPrimary,
  },
  menuVeg: { color: TASTE_OF_INDIA_COLORS.successVeg },
  price: {
    alignSelf: 'flex-start',
    paddingVertical: 1,
    paddingHorizontal: 4,
    borderRadius: 8,
    backgroundColor: TASTE_OF_INDIA_COLORS.success,
  },
  priceText: {
    fontFamily: TASTE_OF_INDIA_FONTS.bold,
    fontSize: 14,
    lineHeight: 20,
    color: TASTE_OF_INDIA_COLORS.white,
  },
  otherApps: {
    fontFamily: TASTE_OF_INDIA_FONTS.medium,
    fontSize: 12,
    lineHeight: 16,
    color: TASTE_OF_INDIA_COLORS.textSecondary,
  },
});
