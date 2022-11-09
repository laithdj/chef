export default [
  {
    name: 'Courses',
    url: 'courses',
    icon: 'video_label',
    isExpanable: false,
    subItems: [],
  },
  {
    name: 'Communication',
    url: 'communication',
    icon: 'insert_comment',
    isExpanable: true,
    subOptions: [
      { name: 'Q&A' },
      { name: 'Messages' },
      { name: 'Assingnments' },
      { name: 'Announcements' },
    ],
  },
  {
    name: 'Performance',
    url: 'performance',
    icon: 'bar_chart',
    isExpanable: true,
    subOptions: [
      { name: 'Overview' },
      { name: 'Students' },
      { name: 'Course engagement' },
      { name: 'Traffic & conversion' },
    ],
  },
  {
    name: 'Tools',
    url: 'tools',
    icon: 'settings',
    isExpanable: false,
    subOptions: [],
  },
  {
    name: 'Resources',
    url: 'resources',
    icon: 'help_outline',
    isExpanable: false,
    subOptions: [],
  },
];