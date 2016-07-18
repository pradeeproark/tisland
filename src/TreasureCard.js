import xs from 'xstream';
import {div, span, input} from '@cycle/dom';
import {html} from 'snabbdom-jsx';

function TreasureCard(sources) {
    const sinks = {
        DOM: sources.DOM.select('#sink').events('click')
        .map(ev => 1)
        .fold((x,y) => x + y, 0)
        .map(c =>
            {
                if (c == 0)
                {
                    return 'NORMAL';
                }
                if (c == 1)
                {
                    return 'FLIPPED';
                }
                if (c == 2)
                {
                    return 'SUNK';
                }                
            }
        )
        .map(cstate =>
            <div id='card'>
            CARD {cstate}
            <button id="sink">SINK</button>
            </div>
        )
                
    }
    
    return sinks;
}

export default TreasureCard;