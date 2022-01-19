Macro.add('consumeEnemy', {
    skipArgs: false,
    handler: function () {
        // if (this.args.length < 2) {
        //     var errors = [];
        //     if (this.args.length < 1) { errors.push('Var 1 Missing') }
        //     if (this.args.length < 2) { errors.push('Var 2 Missing') }
        //     return this.error(`${errors[0]} ${errors.length == 2 ? "and " + errors[1] : ""}`)
        // }

        let $wrapper = $('<span/>').css('display','block').css('text-align','center')
        let prey = this.args[0];

        let consume = [
            {method:'Eat',gen: '',desc:`You shove the enemy down your gullet.`,capacity:'stomach'},
            {method:'Anal',gen: '',desc:`You shove the enemy up your hole`,capacity:'stomach'},
            {method:'Unbirth',gen: 'vagina',desc:`You shove the enemy up your lady bits.`,capacity:'stomach'},
            {method:'Sound',gen: 'penis',desc:`You shove the enemy in your man bits`,capacity:'balls'}
        ]

        consume.forEach(function(con) {
            if(con.gen == '' || State.variables.player.gender[con.gen]) {
                $wrapper.append(
                    $('<button/>')
                        .wiki(con.method)
                        .ariaClick(function(ev) {
                            State.variables.consumeText = con.desc
                            State.variables.consumeHeader = `${con.method}ing ${prey.name}`
                            let consumePoints = calcConsume(prey)
                            addPoints(consumePoints,State.variables.player)
                            addCapacity(State.variables.player,calcWeight(prey.measurements),con.capacity)
                            getExpText(consumePoints) 
                            combatReset()
                            delete State.variables.enemy
                            delete State.variables.willing
                            Engine.play("consume")
                        })
                        .css('width','90%')
                        .css('margin-bottom', '10px')
                )
            }
        })
        
        $wrapper
            .attr('id', `macro-${this.name}`)
            .addClass('consumes')
            .appendTo(this.output);
    }
})

function calcConsume(prey) {
    let response = {};
    for(let points in prey.exp) 
        response[points] = randPoints(prey.exp[points])
    return response;
}

function randPoints(range) {
    if(Array.isArray(range))
        return random(range[0],range[1]);
    return range
}

function addPoints(points, hunter) {
    for(var point in points) {
        hunter.exp[point] += points[point];
    }
}

function addCapacity(hunter,prey,capType) {
    hunter.capacity[capType] += Math.floor(prey)
}

function getExpText(consumePoints) {
    State.variables.consumeExp = []
    for(let cp in consumePoints) {
        State.variables.consumeExp.push(`Gained +${consumePoints[cp]} ${returnStatName(cp)} to Experience`)
    }
}