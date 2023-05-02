import { BLOCKS} from '@contentful/rich-text-types'

const subtitle = {fontSize:'50px'}

const CustomHeading_1 = ({ children }) => (
  <h1 style={subtitle}>{children}</h1>
)

export const options = {
  renderNode: {
    [BLOCKS.HEADING_1]: (node, children) => (
      <CustomHeading_1>{children}</CustomHeading_1>
    ),
  },
}