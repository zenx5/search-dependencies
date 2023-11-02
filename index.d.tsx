interface ItemsRepoType {
    url:    string,
    version:string
}

interface singleUserType {
    id:     string,
    email:  string
}

interface RequestType {
    id:             string,
    owner:          string,
    user:           singleUserType,
    dependencie:    string,
    createdAt:      string
}