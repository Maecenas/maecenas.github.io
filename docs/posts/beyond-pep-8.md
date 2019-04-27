---

title: Raymond Hettinger - Beyond PEP 8
date: 2018-02-09 10:13:40
tags: [Talks, Python]
categories: []
type: post

---

Best practices for beautiful intelligible code

<!-- more -->

🔗<a href="https://www.youtube.com/watch?v=wf-BqAjZb8M" alt="talk">Raymond Hettinger's professional experience at doing code review and architecture review</a>

P vs. NP 👉 Pythonic vs. Non-Pythonic!


## How to make use of PEP 8
1. Golden rule of PEP-8: PEP-8 onto yourself. PEP 8 is style guide, not a law book.
2. Care about intelligibility, not simply visually better
3. Transforming (Java) API to pythonic ones

## Why not PEP 8
1. Code beautifully PEP 8 compliant but bad
2. Distraction from code quality
3. PEP 8-tify would wrap history in case of `git blame`

More details can be found in codes comments and talks.

## P vs. NP #1

It just works:

```python
# XXX -- Top level review comments:
#
# * Nice exception recovery and logging.
#
# * Please cleanup code formatting.
#   This is a little rough on my eyes.
#
# * Should we use this as template for other
#   short network element scripts?
#
# -- Thanks.   The Boss :-)

import jnettool.tools.elements.NetworkElement, \
       jnettool.tools.Routing, \
       jnettool.tools.RouteInsector

ne=jnettool.tools.elements.NetworkElement( '171.0.2.45' )
try:
    routing_table=ne.getRoutingTable()  # fetch table

except jnettool.tools.elements.MissingVar:
  # Record table fault
  logging.exception( '''No routing table found''' )
  # Undo partial changes
  ne.cleanup( '''rollback''' )

else:
    num_routes=routing_table.getSize()   # determine table size
    for RToffset in range ( num_routes ):
           route=routing_table.getRouteByIndex( RToffset )
           name=route.getName()       # route name
           ipaddr=route.getIPAddr()          # ip address
           print "%15s -> %s"% (name,ipaddr) # format nicely
finally:
    ne.cleanup( '''commit''' ) # lockin changes
    ne.disconnect()
```

## P vs. NP #2

After automated tools for style checking:

```python

import jnettool.tools.elements.NetworkElement
import jnettool.tools.Routing
import jnettool.tools.RouteInsector

ne = jnettool.tools.elements.NetworkElement('171.0.2.45')

try:
    routing_table = ne.getRoutingTable()
except jnettool.tools.elements.MissingVar:
    logging.exception('No routing table found')
    ne.cleanup('rollback')
else:
    num_routes = routing_table.getSize()
    for RToffset in range(num_routes):
        route = routing_table.getRouteByIndex(RToffset)
        name = route.getName()
        ipaddr = route.getIPAddr()
        print "%15s -> %s" % (name, ipaddr)
finally:
    ne.cleanup('commit')
    ne.disconnect()
```

## P vs. NP #3

A *Pythonista*, however, would write elegantly encapsulated template file:

```python
from nettools import NetworkElement

with NetworkElement('171.0.2.45') as ne:
    for route in ne.routing_table:
        print "%15s -> %s" % (route.name, route.ipaddr)
```

## P vs. NP #4

And that's what's happening under the hood:

```python
''' Pythonic means "coding beautifully in harmony with
    the language to get the maximum benefits from Python"
    Learn to recognize non-pythonic APIs and to recognize
    good code.  Don't get distracted by PEP 8.  Focus
    first an Pythonic versus NonPython (P vs NP).
    When needed, write an adapter class to convert from
    the former to the latter.
    * Avoid unnecessart packageing in favor of
      simpler imports
    * Create custom exceptions
    * Use properties instaed of getter methods
    * Create a context manager for recurring
      set-up and teardown logic
    * Use magic methods:
          __len__ instead of getSize()
          __getitem__ instead of getRouteByIndex()
          make the table iterable
    * Add good __repr__ for better dubuggability
'''

# Adapter ###########################################

import jnetool.tools.elements.NetworkElement
import jnetool.tools.Routing

class NetworkElementError(Exception):
    pass

class NetworkElement(object):

    def __init__(self, ipaddr):
        self.ipaddr = ipaddr
        self.oldne = jnetool.tools.elements.NetworkElement(ipaddr)

    @property
    def routing_table(self):
        try:
            return RoutingTable(self.oldne.getRoutingTable())
        except jnetool.tools.elements.MissingVar:
            raise NetworkElementError('No routing table found')

    def __enter__(self):
        return self

    def __exit__(self, exctype, excinst, exctb):
        if exctype == NetworkElementError:
            logging.exception('No routing table found')
            self.oldne.cleanup('rollback')
        else:
            self.oldne.cleanup('commit')
        self.oldne.disconnect()

    def __repr__(self):
        return '%s(%r)' % (self.__class__.__name__, self.ipaddr)


class RoutingTable(object):

    def __init__(self, oldrt):
        self.oldrt = oldrt

    def __len__(self):
        return self.oldrt.getSize()

    def __getitem__(self, index):
        if index >= len(self):
            raise IndexError
        return Route(self.oldrt.getRouteByIndex(index))


class Route(object):

    def __init__(self, old_route):
        self.old_route = old_route

    @property
    def name(self):
        return self.old_route.getName()

    @property
    def ipaddr(self):
        return self.old_route.getIPAddr()
```

## P vs. NP #misc1

You can barely read your own code like this:

```python
ts('obama', 20, False, True)

p = (170, 0.1, 0.6)
if p[1] >= 0.5:
    print 'Whew, that is bright!'
if p[2] >= 0.5:
    print 'Wow, that is light'

def get_routes(*args):
    'Return a dictionary of real-time stock quotes'
    return {symbol: get_quote(symbol for symbol in args)}

for interface, status in interfaces:
    if status == 'up':
        print interface
```

## P vs. NP #misc2

…without realizing that you could have done so with “batteries included”:

```python
twitter_search('obama', numtweets=20, retweets=False, unicode=True)

from collections import namedtuple

Color = namedtuple('Color', ['hue', 'saturation', 'luminiosity'])

p = Color(170, 0.1, 0.6)
if p.saturation >= 0.5:
    print 'Whew, that is bright!'
if p.luminiosity >= 0.5:
    print 'Wow, that is light'

def get_routes(*symbols):
    'Return a dictionary of real-time stock quotes'
    return {symbol: get_quote(symbol for symbol in symbols)}

for interface, status in interfaces:
    if status.lower() == 'up':
        print interface
```
