import { useSidebar } from "@/components/ui/sidebar";

export const useNavigation = () => {
  const { setOpen, open } = useSidebar();

  const showNavigation = () => setOpen(true);
  const hideNavigation = () => setOpen(false);
  const toggleNavigation = () => setOpen(!open);

  return {
    showNavigation,
    hideNavigation,
    toggleNavigation,
  };
}; 