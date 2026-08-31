export type FetchState<T> = | {state: "idle"}
    | { state: "loading"}
    | {state: "success", data: T[]}
    | { state: "error", error: string}

