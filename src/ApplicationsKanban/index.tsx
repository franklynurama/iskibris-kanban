import React from 'react';

interface IApplication {
  id: number;
  name: string;
  stage_id_enum: string;
}

interface IColumn {
  name: string;
  label: string;
}

interface Props {
  columns: Array<IColumn>
  items: Array<IApplication>
  onApplicationStatusChanged?: (application: IApplication, newStatus: string) => Promise<void>
  onPreviewApplication?: (application: IApplication) => void;
  onLoadMore?: () => void;
}

const ApplicationsKanban: React.FC<Props> = (props) => {

  const {
    items,
    columns,
    onApplicationStatusChanged,
    onLoadMore,
    onPreviewApplication
  } = props

  return (
    <div>
      kanban component here.
      APPLICATIONS: 
      {items.map(item => {
        return <p>{item.id} - {item.name} - {item.stage_id_enum}</p>
      })}
      COLUMNS: 
      {columns.map(item => {
        return <p>{item.name} - {item.label}</p>
      })}
    </div>
  )
}

export default ApplicationsKanban