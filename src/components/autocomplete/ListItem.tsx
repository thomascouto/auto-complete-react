function ListItem({ itemValue }: ListItemProps) {
  return <div dangerouslySetInnerHTML={{ __html: itemValue }} />;
}

export default ListItem;
