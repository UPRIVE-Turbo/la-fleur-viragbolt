import { Flower, Heart, Gift, Sparkle, Plant } from '@phosphor-icons/react/dist/ssr'
import type { IconProps } from '@phosphor-icons/react'
import type { ComponentType } from 'react'

const ICON_MAP: Record<string, ComponentType<IconProps>> = {
  flower: Flower,
  rings: Heart,
  gift: Gift,
  sparkle: Sparkle,
  plant: Plant,
}

export function ServiceIcon({
  name,
  ...props
}: { name?: string | null | undefined } & IconProps) {
  const Icon = (name && ICON_MAP[name.toLowerCase()]) || Flower
  return <Icon {...props} />
}
