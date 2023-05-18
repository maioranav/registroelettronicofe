export interface PageableFetch<T> {
  content: T;
  pageable: Pageable;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  sort: Sort;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

export interface Pageable {
  sort: Sort;
  offset: number;
  pageSize: number;
  pageNumber: number;
  paged: boolean;
  unpaged: boolean;
}

export interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export interface Corso {
  id?: number;
  name: string;
  plesso: Plesso;
  docente?: Docente;
}

export interface Docente {
  id: number;
  name: string;
  surname: string;
  username: string;
  email: string;
}

export interface Studente {
  id: number;
  name: string;
  surname: string;
  username: string;
  email: string;
  corsi?: Corso[];
}

export interface Plesso {
  id: number;
  name?: string;
  corsi?: Corso[];
}
