export const PROJECT_CATEGORY_VALUES = [
  'kitchen',
  'bedroom',
  'children',
  'living_room',
  'hallway',
  'office',
  'other',
] as const;

export type ProjectCategory = (typeof PROJECT_CATEGORY_VALUES)[number];

export type ProjectCategoryOption = {
  value: ProjectCategory;
  label: string;
};

export const PROJECT_CATEGORY_OPTIONS: ProjectCategoryOption[] = [
  { value: 'kitchen', label: 'Кухонный' },
  { value: 'bedroom', label: 'Спальный' },
  { value: 'children', label: 'Детский' },
  { value: 'living_room', label: 'Гостиная' },
  { value: 'hallway', label: 'Прихожая' },
  { value: 'office', label: 'Офисный' },
  { value: 'other', label: 'Другое' },
];

export const PROJECT_CATEGORY_LABELS: Record<ProjectCategory, string> = PROJECT_CATEGORY_OPTIONS.reduce(
  (acc, option) => {
    acc[option.value] = option.label;
    return acc;
  },
  {} as Record<ProjectCategory, string>,
);

export const ALL_PROJECT_CATEGORIES_VALUE = 'all' as const;

export function isProjectCategory(value: string): value is ProjectCategory {
  return PROJECT_CATEGORY_VALUES.includes(value as ProjectCategory);
}

export function getProjectCategoryLabel(category: string | null | undefined) {
  if (!category || !isProjectCategory(category)) {
    return PROJECT_CATEGORY_LABELS.other;
  }

  return PROJECT_CATEGORY_LABELS[category];
}
