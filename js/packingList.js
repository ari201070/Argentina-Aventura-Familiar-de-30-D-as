// js/packingList.js

function addItem() {
  const input = document.getElementById('new-item');
  const itemText = input.value.trim();
  
  if (!itemText) return;

  const list = document.getElementById('item-list');
  const li = document.createElement('li');
  
  li.textContent = itemText;
  li.className = 'list-item';
  
  // Botón para eliminar
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = "❌";
  deleteBtn.className = 'delete-btn';
  deleteBtn.onclick = () => {
    li.remove();
    saveList();
  };
  
  li.appendChild(deleteBtn);
  list.appendChild(li);
  input.value = '';
  saveList();
}

function saveList() {
  const items = Array.from(document.querySelectorAll('#item-list .list-item')).map(li => li.textContent.replace("❌", "").trim());
  localStorage.setItem('packingList', JSON.stringify(items));
}

function loadList() {
  const saved = localStorage.getItem('packingList');
  if (!saved) return;

  try {
    const items = JSON.parse(saved);
    const list = document.getElementById('item-list');
    
    items.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item;
      li.className = 'list-item';
      
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = "❌";
      deleteBtn.className = 'delete-btn';
      deleteBtn.onclick = () => {
        li.remove();
        saveList();
      };
      
      li.appendChild(deleteBtn);
      list.appendChild(li);
    });
  } catch (e) {
    console.error("Failed to load list:", e);
  }
}

// Inicializar al cargar
document.addEventListener('DOMContentLoaded', loadList);
