import {connect} from 'react-redux'
import {
  selectMonster1,
  selectMonster2,
  monster1Attack,
  monster2Attack,
  startBattle
} from '../../store'

const mapStateToProps = ({
  turns,
  monsters,
  monster1,
  monster2,
  monster1Health,
  monster2Health,
  monster1Log,
  monster2Log,
  battleStarted
}) => ({
  turns,
  defender: turns.length % 2 ? monster1.name : monster2.name,
  monsters,
  monster1, 
  monster2, 
  monster1Health, 
  monster2Health, 
  monster1Log: turns.filter((_, i) => Boolean(i % 2)),
  monster2Log: turns.filter((_, i) => !Boolean(i % 2)),
  battleStarted
})

const mergeProps = (
  {
    turns,
    ...stateProps
  }, 
  {
    monster1Attack,
    monster2Attack,
    startBattle,
    ...dispatchProps
  }, 
  ownProps
) => ({
  ...stateProps, 
  ...dispatchProps,
  nextTurnAction: !stateProps.battleStarted 
    ? startBattle
    : turns.length % 2
      ? monster2Attack
      : monster1Attack
})

export default connect(
  mapStateToProps,
  {
    selectMonster1,
    selectMonster2,
    monster1Attack,
    monster2Attack,
    startBattle
  },
  mergeProps
)