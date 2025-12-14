"use client"

import { useMemo } from 'react'

/**
 * Custom hook for filtering data by island
 * Returns filtered data based on selected island
 */
export function useIslandFilter<T extends { island: string }>(
     data: T[],
     selectedIsland: string
): T[] {
     return useMemo(() => {
          if (selectedIsland === 'all') return data
          return data.filter(item => item.island === selectedIsland)
     }, [data, selectedIsland])
}
