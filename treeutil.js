/****************************/
/*          tree util       */

var walk_lfold = function(node, f_init, f, f_fini) {
    var sum = f_init();
    if (node.children) {
        node.children.forEach(
                function (c) {
                    console.log('summing ' + '(' + c.id + '): ' + c.amount);
                    sum = f(sum, walk_lfold(c, f_init, f, f_fini));
                });
    };
    return f_fini(sum, node);
};

var sum_tree = function(node, field) {
    return walk_lfold(node, function() { return 0; },
            function (sum, node_sum) {
                return sum + node_sum;
            },
            function (sum, node) {
                if (node[field]) {
                    sum += node[field];
                } else {
                    node[field]= sum;
                }
                return sum
            }
    )
};

/*
 * Returns a node of the form: {key:value, "children":[other_nodes]}
 * Which is a copy of the template tree plus the nodes in list, which
 * temselves are just leaves.
 */
var tree_from_list = function(list) {
    var d = {};
    var roots = [];
    for (k in list) {
        var item = list[k];
        d[item.id] = item;
        item.children = [];
    }
    for (k in list) {
        var item = list[k];
        if (item.parent) {
            d[item.parent].children.push(item);
        } else {
            roots.push(item);
        }
    }
    if (roots.length == 1) {
        root = roots[0];
    } else {
        root = {'parent':null, 'children': roots, 'name': 'template root', 'id': 'template_root'};
        d[root.id] = root;
    }
    root.d = d;
    return root;
};

// Debugging helper
if (document) {
    document.tree_from_list = tree_from_list;
}
