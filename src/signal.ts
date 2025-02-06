export default class Signal<T = any> {
    private listeners: Array<(data: T) => void> = []
    private value: T
  
    constructor(initialValue: T) {
        this.value = initialValue
    }
  
    // Add a listener to the signal
    addListener(listener: (data: T) => void): void {
        this.listeners.push(listener)
    }
  
    // Notify all listeners with the provided data
    notify(data: T): void {
        this.listeners.forEach(listener => listener(data))
    }
  
    // Remove a listener from the signal
    removeListener(listener: (data: T) => void): void {
        this.listeners = this.listeners.filter(l => l !== listener)
    }
  
    // Set a new value and notify listeners
    set(newValue: T): void {
        this.value = newValue
        this.notify(this.value)
    }
  
    // Update the value using a callback function and notify listeners
    update(updateFn: (currentValue: T) => T): void {
        this.value = updateFn(this.value)
        this.notify(this.value)
    }
  
    // Get the current value
    getValue(): T {
        return this.value
    }
  }