export const commonStyles = {
  // Container styles
  container: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8",
  
  // Typography
  title: "text-2xl md:text-3xl font-bold text-center text-gray-800 mb-6",
  subtitle: "text-lg md:text-xl font-semibold text-gray-700 mb-4",
  sectionTitle: "text-xl font-bold text-gray-800 mb-4",
  
  // Form elements
  formGroup: "mb-6",
  label: "block mb-2 font-medium text-gray-700",
  select: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white",
  input: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent",
  
  // Buttons
  button: "w-full md:w-auto px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed",
  buttonOutline: "w-full md:w-auto px-6 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors duration-200 flex items-center justify-center gap-2",
  
  // Cards
  card: "bg-white rounded-xl shadow-lg p-6 mb-6",
  cardHover: "bg-white rounded-xl shadow-lg p-6 mb-6 transition-transform duration-300 hover:-translate-y-1",
  
  // Progress
  progressBar: "w-full h-2 bg-gray-200 rounded-full mb-8",
  progressStep: "h-full bg-blue-600 rounded-full transition-all duration-300",
  
  // Grid layouts
  grid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
  gridWide: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6",
  
  // Flex layouts
  flexBetween: "flex items-center justify-between",
  flexCenter: "flex items-center justify-center",
  
  // Tags and badges
  tag: "px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm",
  badge: "px-2 py-1 bg-blue-600 text-white rounded-full text-xs",
  
  // Lists
  list: "space-y-2",
  listItem: "flex items-center gap-2 text-gray-600",
  
  // Images
  image: "w-full h-48 object-cover rounded-lg",
  imageHover: "w-full h-48 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105",
  
  // Text colors
  textPrimary: "text-gray-800",
  textSecondary: "text-gray-600",
  textMuted: "text-gray-400",
  
  // Spacing
  section: "py-12",
  sectionLarge: "py-16",
  
  // Responsive
  responsive: {
    container: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
    grid: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6",
  }
}; 