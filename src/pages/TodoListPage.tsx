
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Edit2, Trash2, GripVertical, Check, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;
}

const STORAGE_KEY = 'web-toolbox-todos';
const STORAGE_DATE_KEY = 'web-toolbox-todos-date';

export default function TodoListPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoText, setNewTodoText] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = () => {
    const today = new Date().toDateString();
    const lastSavedDate = localStorage.getItem(STORAGE_DATE_KEY);
    
    // Clear todos if it's a new day
    if (lastSavedDate !== today) {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.setItem(STORAGE_DATE_KEY, today);
      setTodos([]);
      if (lastSavedDate) {
        toast({
          title: "New Day, Fresh Start!",
          description: "Your todo list has been cleared for today.",
        });
      }
      return;
    }

    const savedTodos = localStorage.getItem(STORAGE_KEY);
    if (savedTodos) {
      try {
        setTodos(JSON.parse(savedTodos));
      } catch (error) {
        console.error('Error parsing todos:', error);
        setTodos([]);
      }
    }
  };

  const saveTodos = (updatedTodos: Todo[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTodos));
    const today = new Date().toDateString();
    localStorage.setItem(STORAGE_DATE_KEY, today);
  };

  const addTodo = () => {
    if (!newTodoText.trim()) return;

    const newTodo: Todo = {
      id: Date.now().toString(),
      text: newTodoText.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
    };

    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    saveTodos(updatedTodos);
    setNewTodoText('');
    
    toast({
      title: "Todo Added",
      description: "New todo item has been added to your list.",
    });
  };

  const deleteTodo = (id: string) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
    saveTodos(updatedTodos);
    
    toast({
      title: "Todo Deleted",
      description: "Todo item has been removed from your list.",
    });
  };

  const toggleComplete = (id: string) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    saveTodos(updatedTodos);
  };

  const startEdit = (todo: Todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  const saveEdit = () => {
    if (!editText.trim()) return;

    const updatedTodos = todos.map(todo =>
      todo.id === editingId ? { ...todo, text: editText.trim() } : todo
    );
    setTodos(updatedTodos);
    saveTodos(updatedTodos);
    setEditingId(null);
    setEditText('');
    
    toast({
      title: "Todo Updated",
      description: "Todo item has been updated successfully.",
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText('');
  };

  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedItem(id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    
    if (!draggedItem || draggedItem === targetId) return;

    const draggedIndex = todos.findIndex(todo => todo.id === draggedItem);
    const targetIndex = todos.findIndex(todo => todo.id === targetId);

    if (draggedIndex === -1 || targetIndex === -1) return;

    const newTodos = [...todos];
    const [draggedTodo] = newTodos.splice(draggedIndex, 1);
    newTodos.splice(targetIndex, 0, draggedTodo);

    setTodos(newTodos);
    saveTodos(newTodos);
    setDraggedItem(null);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Todo List
        </h1>
        <p className="text-center text-sm text-slate-600 dark:text-slate-400 mb-8">
          Manage your daily tasks. List resets every day for a fresh start!
        </p>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Add New Todo
              {totalCount > 0 && (
                <span className="text-sm font-normal text-muted-foreground">
                  {completedCount}/{totalCount} completed
                </span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input
                placeholder="What needs to be done?"
                value={newTodoText}
                onChange={(e) => setNewTodoText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTodo()}
                className="flex-1"
              />
              <Button onClick={addTodo} disabled={!newTodoText.trim()}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {todos.length > 0 ? (
          <Card>
            <CardHeader>
              <CardTitle>Your Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {todos.map((todo) => (
                  <div
                    key={todo.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, todo.id)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, todo.id)}
                    onDragEnd={handleDragEnd}
                    className={`flex items-center gap-3 p-3 border rounded-lg transition-colors cursor-move hover:bg-slate-50 dark:hover:bg-slate-800 ${
                      draggedItem === todo.id ? 'opacity-50' : ''
                    } ${todo.completed ? 'bg-green-50 dark:bg-green-950/20' : 'bg-white dark:bg-slate-950'}`}
                  >
                    <GripVertical className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    
                    <Checkbox
                      checked={todo.completed}
                      onCheckedChange={() => toggleComplete(todo.id)}
                      className="flex-shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      {editingId === todo.id ? (
                        <div className="flex gap-2">
                          <Input
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && saveEdit()}
                            className="flex-1"
                            autoFocus
                          />
                          <Button size="sm" onClick={saveEdit} disabled={!editText.trim()}>
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={cancelEdit}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <span className={`block truncate ${todo.completed ? 'line-through text-muted-foreground' : ''}`}>
                          {todo.text}
                        </span>
                      )}
                    </div>

                    {editingId !== todo.id && (
                      <div className="flex gap-1 flex-shrink-0">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => startEdit(todo)}
                          className="h-8 w-8 p-0"
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => deleteTodo(todo.id)}
                          className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="text-center py-12">
              <div className="text-muted-foreground">
                <Plus className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg mb-2">No todos yet</p>
                <p className="text-sm">Add your first task to get started!</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
