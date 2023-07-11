// Define a type for the slice state
export interface ToDo {
    id: string ;
    task: string;
    completed: boolean
  }
  
  export interface InitialState {
    todo: ToDo[];
    loading: boolean;
    error: string | null | undefined;
  }

