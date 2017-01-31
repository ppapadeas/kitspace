const React    = require('react')
const Markdown = require('react-markdown')
const semantic = require('semantic-ui-react')

const Steps = require('./steps')
const UrlSubmit = require('./url_submit')

const TitleBar = require('../title_bar')
const BOM = require('../page/bom')


const Step2 = React.createClass({
  render() {
    const board = this.props.board
    let instructions, nextButton
    console.log(board)
    if (board.bom === '' && (board.status === 'done' || board.status === 'not sent')) {
      const instruction_text = 'Add a [1-click-bom.tsv](https://1clickbom.com/#usage)'
        + ' to the root of your repository.'
        + ' If you would like to put it in a different folder or call it something'
        + ' else, add it to your kitnic.yaml e.g.\n\n'
        + '```\n'
        + 'bom: path/to/bom.tsv\n'
        + '```\n'
        instructions = <Markdown
          className = 'instructions'
          source    = {instruction_text} />
    }
    else if (board.bom !== '') {
      nextButton = <semantic.Button
        content       = 'Next'
        icon          = 'right arrow'
        labelPosition = 'right'
        color         = 'green'
        onClick       = {this.props.setStep(3)} />
    }
    return (
    <div className='Step Step2'>
      <TitleBar>
        <div className='titleText'>
          {'Submit a project'}
        </div>
      </TitleBar>
      <semantic.Container>
        <Steps setStep={this.props.setStep} active={2}/>
        <div className='userInputSegment'>
          <UrlSubmit dispatch={this.props.dispatch} board={board} />
          {nextButton}
        </div>
        {instructions}
        <BOM tsv={board.bom} />
      </semantic.Container>
    </div>
    )
  },
})

module.exports = Step2
