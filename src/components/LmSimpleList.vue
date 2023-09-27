<template>
  <v-table>
    <thead>
      <tr>
        <th
          v-for="(header, index) in headers"
          :key="`header-${header}-${index}`"
          :class="`text-${header.headerAlign ? header.headerAlign : 'left'}`"
        >
          {{ header.text }}
        </th>
      </tr>
    </thead>

    <tbody>
      <slot name="prepend" />

      <template v-if="items.length">
        <tr
          v-for="item in props.items"
          :key="`row-${item.id}`"
        >
        <td
            v-for="(header, index) in headers"
            :key="`value-${header}-${index}`"
            :class="`text-${header.textAlign ? header.textAlign : 'left'}`"
          >
            <template v-if="header.value">
              {{ item[header.value] }}
            </template>

            <slot
              v-else-if="header.name"
              :name="header.name"
              v-bind="item"
            />

            <span v-else>
              N/A
            </span>
          </td>
        </tr>
      </template>

      <tr v-else>
        <td
          class="text-grey text-center"
          :colspan="headers.length"
        >
          No data
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<script setup lang="ts">
import type SimpleListHeader from '@/types/simple-list-header.type';

const props = defineProps<{
  headers: SimpleListHeader[];
  items: any[];
}>();
</script>