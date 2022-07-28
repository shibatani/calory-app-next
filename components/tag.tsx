import { useState, useEffect } from 'react'
import { Chip } from '@mui/material'

type Props = {
  kind: number
}

type Tag = {
  type: "default" | "primary" | "info" | "success" | "warning"
  label: string
}

export default function Tag(props: Props) {
  const [tag, setTag] = useState<Tag>({
    type: "default",
    label: ""
  })

  const tags = {
    1: { type: "success", label: "朝食" },
    2: { type: "primary", label: "昼食" },
    3: { type: "warning", label: "夕食" },
    4: { type: "info", label: "その他" }
  };

  useEffect(() => {
    setTag(tags[props.kind])
  }, [props]);
  
  return (
    <>
      <Chip label={tag.label} color={tag.type} size="small"></Chip>
    </>
  )
}