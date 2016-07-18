import xs from 'xstream';
import {run} from '@cycle/xstream-run';
import {makeDOMDriver} from '@cycle/dom';
import {html} from 'snabbdom-jsx';
import isolate from '@cycle/isolate';
import TreasureCard from './TreasureCard';

  
function main(sources) {
    let tc = TreasureCard(sources);
    let click$ = sources.DOM.select('#treasurepile').events('click')
      .map(ev => 1)
    .fold((x,y) => x + y, 0);
    console.log(click$);
    const board$ = click$
      .map(count =>
         
        <div>
          <style type="text/gss">            
            #island[height] == 600;
            #island[width] == #island[height] * 409/450;
            #island[center] == ::window[center];
            
            #treasurepile[size] == #treasurepile[intrinsic-size];
            #floodpile[size] == #floodpile[intrinsic-size];
            #island[size] == #island[intrinsic-size];  
            #floodpile[size] == #floodpile[intrinsic-size];  
            #flooddiscardpile[size] == #flooddiscardpile[intrinsic-size];  
                      
            #treasureset[size] == #treasureset[intrinsic-size];
            #floodset[size] == #floodset[intrinsic-size];
            @h (#treasureset)-100-(#island)-100-(#floodset);
            @v (#floodpile)-10-(#flooddiscardpile);
            @v (#treasurepile)-10-(#treasurediscardpile);
          </style>
          <div id="island">ISLAND</div>
          <div id="treasureset">
              <div id="treasurepile">TPILE</div>
              <div id="treasurediscardpile">TD</div>
          </div>
          <div id="floodset">
              <div id="floodpile">FPILE</div>
              <div id="flooddiscardpile">FD</div>    
          </div>
            D 
          <p>
          Count: {count}
          </p>
         </div>
      );

  const sinks = {
      DOM: xs.combine(board$,tc.DOM)
      .map(([board,tc]) => 
          <div>{board} {tc}</div>
      )
  };
  return sinks;
}

const drivers = {
  DOM: makeDOMDriver('#app')
};

run(main, drivers);