import { useState, useEffect } from 'react'
import { Chip } from '@mui/material'

type Props = {
  kind: number
}

type Tag = {
  type: "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning"
  label: string
}

export default function Tag(props: Props) {
  const [tag, setTag] = useState<Tag>({
    type: "default",
    label: ""
  })

  useEffect(() => {
    switch (props.kind) {
      case 1:
        setTag({ type: "success", label: "朝食" })
        break
      case 2:
        setTag({ type: "primary", label: "昼食" })
        break
      case 3:
        setTag({ type: "warning", label: "夕食" })
        break
      case 4:
        setTag({ type: "info", label: "その他" })
        break
      default:
        setTag({ type: "success", label: "その他" })
        break
    }
  }, [props]);
  
  return (
    <div>
      <Chip label={tag.label} color={tag.type} size="small"></Chip>
    </div>
  )
}