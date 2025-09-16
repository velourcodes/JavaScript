const API_URL = (() => 
{
  // Checks for Netlify environment variable first (Vite-style)
  if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_URL) 
  {
    return import.meta.env.VITE_API_URL;
  }
  
  // 2. Checks for local development
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') 
  {
    return 'http://localhost:5075/api/todos';
  }
  
  // 3. Fallback - will be updated via Netlify environment variable
  return 'https://my-render-backend-url.onrender.com/api/todos';
})();

async function fetchTodos() 
{
  try 
  {
    const res = await fetch(API_URL);
    
    if (!res.ok) 
    {
      console.error("Response not ok:", res.status);
      return;
    }
  
    const responseText = await res.text();
    console.log("Raw response:", responseText);
    
    let data;
    try 
    {
      data = JSON.parse(responseText);
    } 
    catch (parseError) 
    {
      console.error("JSON parse error:", parseError);
      console.error("Response was:", responseText);
      return;
    }

    const list = document.getElementById("todoList");
    list.innerHTML = "";

    if (!data.todo || !Array.isArray(data.todo)) {
      console.error("Expected data.todo to be an array, got:", data.todo);
      return;
    }

    data.todo.forEach(t => 
    {
      const li = document.createElement("li");
      li.textContent = t.title + (t.completed ? " ✅" : "");

      const toggleBtn = document.createElement("button");
      toggleBtn.textContent = t.completed ? "Undo" : "Done";
      toggleBtn.style.marginLeft = "10px";
      toggleBtn.onclick = () => toggleTodo(t.id, !t.completed);

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.style.marginLeft = "10px";
      deleteBtn.onclick = () => deleteTodo(t.id);
      li.appendChild(toggleBtn);
      li.appendChild(deleteBtn);
      list.appendChild(li);
    });
  } 
  catch (err) 
  {
    console.error("Failed to fetch todos:", err);
  }
}

async function toggleTodo(id, completed) 
{
  try 
  {
    const response = await fetch(`${API_URL}/${id}`, 
    {
      method: "PUT",
      headers: 
      { "Content-Type": "application/json" },
      body: JSON.stringify({ completed })
    });
    
    if (response.ok) 
    {
      fetchTodos();
    } 
    else 
    {
      console.error("Failed to toggle todo, status:", response.status);
    }
  } 
  catch (err) 
  {
    console.error("Failed to toggle todo:", err);
  }
}

async function deleteTodo(id) 
{
  try 
  {
    const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    
    if (response.ok) 
    {
      fetchTodos();
    } 
    else 
    {
      console.error("Failed to delete todo, status:", response.status);
    }
  } 
  catch (err) 
  {
    console.error("Failed to delete todo:", err);
  }
}

document.getElementById("todoForm").addEventListener("submit", async (e) => 
{
  e.preventDefault();
  const input = document.getElementById("todoInput");
  const title = input.value.trim();
  if (!title) return;
  try 
  {
    const response = await fetch(API_URL, 
    {
      method: "POST",
      headers: 
      { "Content-Type": "application/json" },
      body: JSON.stringify({ title })
    });
    
    if (response.ok) 
    {
      input.value = "";
      fetchTodos();
    } 
    else 
    {
      console.error("Failed to add todo, status:", response.status);
    }
  } 
  catch (err) 
  {
    console.error("Failed to add todo:", err);
  }
});

window.onload = fetchTodos;