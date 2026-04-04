'use client'

import { useState } from 'react'
import { useSchedule } from '@/src/hooks/useSchedule'
import { DaySelector, type DayOfWeek } from './DaySelector'
import { ScheduleWeekOverview } from './ScheduleWeekOverview'
import { ScheduleToggle } from './ScheduleToggle'
import { SchedulerConfirmation } from './SchedulerConfirmation'

export function SchedulePage() {
  const {
    confirmMessage,
    isGlobalEnabled,
    isApplying,
    isMutating,
    toggleGlobalSchedules,
    isLoading: hookLoading,
  } = useSchedule()

  const [selectedGroupDays, setSelectedGroupDays] = useState<Set<DayOfWeek>>(new Set())

  return (
    <div className="space-y-3 sm:space-y-4">
      <DaySelector
        activeDay="sunday"
        onActiveDayChange={() => {}}
        readOnly
        highlightedDays={selectedGroupDays}
      />

      <ScheduleWeekOverview
        onGroupDaysChange={setSelectedGroupDays}
        selectedGroupDays={selectedGroupDays}
      />

      <ScheduleToggle
        enabled={isGlobalEnabled}
        onToggle={() => void toggleGlobalSchedules()}
        isLoading={isMutating || hookLoading}
      />

      <SchedulerConfirmation
        message={confirmMessage}
        isLoading={isApplying}
        variant={confirmMessage?.includes('Failed') ? 'error' : 'success'}
      />
    </div>
  )
}
