import { DISASTER_TYPES, type DisasterType } from '@/interface'

export const getDisasterTypeInfo = (type: DisasterType | string) => {
     return DISASTER_TYPES.find(t => t.value === type)
}

export const getDisasterTypeIcon = (type: DisasterType | string): string => {
     const info = getDisasterTypeInfo(type)
     return info?.iconName || 'AlertCircle'
}

export const getDisasterTypeLabel = (type: DisasterType | string): string => {
     const info = getDisasterTypeInfo(type)
     return info?.label || 'Tidak Diketahui'
}

export const getDisasterTypeColor = (type: DisasterType | string): string => {
     const info = getDisasterTypeInfo(type)
     return info?.color || '#6b7280'
}

export const getDisasterTypeBgColor = (type: DisasterType | string): string => {
     const info = getDisasterTypeInfo(type)
     return info?.bgColor || '#f3f4f6'
}
