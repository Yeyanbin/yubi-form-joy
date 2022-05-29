
import JSONEditor from 'jsoneditor';
import { ref } from 'vue';


const useJsonEditor = (id: string, initialJson = {}) => {
  const container = document.getElementById(id)
  const options = {
    onChangeText: (jsonString) => {
      jsonValue.value = jsonString;
    }
  }
  const editor = new JSONEditor(container, options);
  

  editor.set(initialJson)
  
  const setJson = (jsonObj) => {
    editor.set(jsonObj)
  }

  const jsonValue = ref('')

  return [jsonValue, setJson];
}

export default useJsonEditor;