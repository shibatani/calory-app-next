import { useState, useEffect } from 'react'
import { Chip } from '@mui/material'

type Props = {
  kind: string
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
      case "breakfast":
        setTag({ type: "success", label: "朝食" })
        break
      case "lunch":
        setTag({ type: "primary", label: "昼食" })
        break
      case "dinner":
        setTag({ type: "warning", label: "夕食" })
        break
      case "other":
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