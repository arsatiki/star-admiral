from random import randint, choice, shuffle

class Ship(object):
    def __init__(self, name, hp, atk):
        self.hp = hp
        self.atk = atk
        self.name = name
    
    def __str__(self):
        return "%s (%d)" % (self.name, self.hp)
    
    def fire(self, target):
        print "%s fires at %s for %d points" % (self, target, self.atk),
        target.hp -= self.atk
        if target.dead:
            print " -- target destroyed."
        else:
            print
    
    @property
    def dead(self): return self.hp <= 0

def weakest(targets, own_ships):
    _, ship = min((ship.hp, ship) for ship in targets)
    return ship

def strongest(targets, own_ships):
    _, ship = max((ship.hp, ship) for ship in targets)
    return ship

def first(targets, own_ships): return targets[0]

def deadliest(targets, own_ships):
    _, ship = max((ship.atk, ship) for ship in targets)
    return ship

def randomly(targets, own_ships): return choice(targets)

def fleet(fleetname, n = 5):
    def mean(stats):
        return sum(stats)/len(stats)

    print "Creating fleet", fleetname

    ships = []
    for k in range(n):
        hp = randint(5, 25)
        atk = randint(4, 16)
        name = "%s %d" %(fleetname, k)
        ships.append(Ship(name, hp, atk))
        
        print "\tCommissioned ship with %d hp and attck %d" %(hp, atk)
        
    total_hp = sum(ship.hp for ship in ships)
    total_atk = sum(ship.atk for ship in ships)
    print "Fleet strength: %d hp, ATK %d" % (total_hp, total_atk)

    print
    return ships


def simulate(strat1 = weakest, strat2 = deadliest):
    f1name, f2name = 'Borbon', 'Hoxtorz'
    
    fleet1 = fleet(f1name)
    fleet2 = fleet(f2name)
    
    strategies = {f1name: strat1, f2name: strat2}
    fleets = {f1name: (fleet1, fleet2), f2name: (fleet2, fleet1)}
    
    own_fleet = {}
    for ship in fleet1:
        own_fleet[ship] = f1name
    for ship in fleet2:
        own_fleet[ship] = f2name
    
    while fleet1 and fleet2:
        print
        print "New round!"
        print
        
        battleorder = fleet1 + fleet2
        shuffle(battleorder)
        
        for ship in battleorder:
            if ship.dead:
                continue
            
            fleet_name = own_fleet[ship]
            strategy = strategies[fleet_name]
            own, targets = fleets[fleet_name]
            target = strategy(targets, own)
            
            ship.fire(target)
            
            if target.dead:
                targets.remove(target)
            
            if not targets:
                break
    
    winner = f1name if fleet1 else f2name
    print
    print winner, "is the new Galactic champion!"
    print
    

if __name__ == '__main__':
    simulate()