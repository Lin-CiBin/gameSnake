<template>
  <div class="Container">
    <div class="GridSpace">
      <div v-for="row in grid" class="rowSpace">
        <span v-for="col in row" class="cell">{{ col === 0 ? '' : col }}</span>
      </div>
      <div class="SnakeQube">
        <div v-for="body in snake" :class="['SnakeCell']" :style="getTilePos(snake)">
          {{ tile.value }}
        </div>
      </div>
      <!-- <div class="SnakeQube">
        <div v-for="tile in tiles" :class="['SnakeCell']" :style="getTilePos(tile)">
          {{ tile.value }}
        </div>
      </div> -->
    </div>
  </div>
</template>
<script setup>
import { onMounted, reactive, ref } from 'vue'
const GRID_COL_SIZE = 4
const GRID_ROW_SIZE = 4
const grid = ref([])
const tiles = ref({})
const emptyCell = ref({})
const food = reactive({})
const snake = reactive({})
onMounted(() => {
  initGame()
  initSnakeBody()
  createNewTile()
})

function initGame() {
  grid.value = Array(GRID_COL_SIZE).fill().map(() => Array(GRID_ROW_SIZE).fill(0))
}

function getEmptyCell() {
  emptyCell.value = grid.value.flatMap((row, rowIndex) => row.map((cell, colIndex) => cell === 0 ? { row: rowIndex, col: colIndex } : null).filter(Boolean))
}

function createNewTile() {
  getEmptyCell()
  // const id = `tile-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const { row, col } = emptyCell.value[Math.floor(Math.random() * emptyCell.value.length)]
  grid.value[row][col] = `1`
  const position = {
    x: col,
    y: row
  }
  food.position = position
}
function initSnakeBody() {
  const startX = Math.floor(GRID_COL_SIZE / 4)
  const startY = Math.floor(GRID_ROW_SIZE / 2)
  snake.body = [
    { x: startX, y: startY },
    { x: startX - 1, y: startY },
    { x: startX - 2, y: startY }
  ]
  // 3. 设置初始方向
  snake.direction = 'right'
  snake.nextDirection = 'right'
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

.cell {
  background-color: bisque;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px rgb(0, 0, 0) solid;
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
</style>