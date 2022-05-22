
import { onMounted, onUnmounted, ref } from 'vue';  
import { useDebounceRAF } from './useDebounce';

/**
 * 大概构想是返回两个当前鼠标的追踪坐标
 */
export const useMouseTrack = () => {
  const xRef = ref(0);
  const yRef = ref(0);

  const _init = () => {

    const track = (e: MouseEvent) => {
      xRef.value = e.offsetX;
      yRef.value = e.offsetY;
    };
    
    onMounted(() => {
      document.onmousemove = useDebounceRAF(track);
    });

    onUnmounted(() => {
      document.onmousemove = () => {};
    });
  }
  _init();
  return {
    xRef,
    yRef,
  }
}