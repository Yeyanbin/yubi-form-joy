<script setup lang="ts">
import jsonEditor from 'jsoneditor';

const container = document.getElementById("jsoneditor")
const options = {}
const editor = new jsonEditor(container, options)

// set json
const initialJson = {
    "Array": [1, 2, 3],
    "Boolean": true,
    "Null": null,
    "Number": 123,
    "Object": {"a": "b", "c": "d"},
    "String": "Hello World"
}
editor.set(initialJson)

</script>

<template>
  <div id="jsoneditor" style="width: 400px; height: 400px;"></div>
</template>