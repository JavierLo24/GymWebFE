export interface ISidebar {
  title: string,
  icon?: string,
  link?: string[],
  children?: ISidebar[]
  hidden?: boolean
}
