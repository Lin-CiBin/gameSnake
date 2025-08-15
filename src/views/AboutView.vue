<template>
  <div class="Container">
    <div class="GridSpace">
      <div v-for="row in GRID_SIZE" class="rowSpace">
        <span v-for="col in GRID_SIZE" class="cell"></span>
      </div>
      <div class="SnakeQube">
        <div v-for="tile in tiles" :class="['SnakeCell']" :style="getTilePos(tile)">
          {{ tile.value }}
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
const GRID_SIZE = 4
const grid = ref([])
const tiles = ref({})
const emptyCell = ref({})
onMounted(() => {
  initGame()
  createNewTile()
})

function initGame() {
  grid.value = Array(GRID_SIZE).fill().map(() => Array(GRID_SIZE).fill(0))
}

function getEmptyCell() {
  emptyCell.value = grid.value.flatMap((row, rowIndex) => row.map((cell, colIndex) => cell === 0 ? { row: rowIndex, col: colIndex } : null).filter(Boolean))
}

function createNewTile() {
  getEmptyCell()
  const id = `tile-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const { row, col } = emptyCell.value[Math.floor(Math.random() * emptyCell.value.length)]
  grid.value[row][col] = `😂`
  const tile = {
    id,
    prevRow: row,
    prevCol: col,
    row,
    col,
    value: grid.value[row][col]
  };
  tiles.value[id] = tile
}

function getTilePos(tile) {
  const cellSize = 50
  return {
    top: `${tile.row * cellSize}px`,
    left: `${tile.col * cellSize}px`
  }
}
</script>
<style scoped>
.Container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 96vh;
}

.GridSpace {
  display: flex;
  flex-wrap: wrap;
  width: 300px;
}

.rowSpace {
  display: flex;
}

.cell {
  background-color: bisque;
}

.cell,
.SnakeQube,
.SnakeCell {
  height: 50px;
  width: 50px;
}


.SnakeQube,
.SnakeCell {
  position: absolute;
}

.SnakeCell {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>