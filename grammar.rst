Grammar for proc notation
=========================

This grammar is written as close as the actual implemention used in acorn
parser extension, with subtle things left out for clarity, such as optional
semi-colon (although in some cases it can cause problem if omitted).

::

  proc_expr ::= 'proc' proc_param '->' cmd
  proc_param ::= '(' pattern type_anno ')'
               | pattern

  cmd  ::= expr '-<' expr_assign
         | 'if' '(' expr ')' cmd ';' 'else' cmd
         | 'let' pattern type_anno '=' expr 'and' cmd
         | 'try' cmd 'catch' cmd
         | 'do' '{' do_body cmd '}'
         | '(|' expr_atom cmd_list '|)'
         | '(' cmd ')'
         | '{' stmt_list '}'

  do_body ::= %empty
            | cmdstmt_list

  cmdstmt_list ::= cmdstmt_list ';' cmdstmt
                 | cmdstmt

  cmdstmt ::= pattern type_anno '<-' cmd
            | let pattern type_anno = expr
            | cmd

  cmd_list ::= cmd_list cmd
             | cmd


JavaScript::

  stmt_list ::= ...  semicolon-separated sequence of statements

  expr ::= expr_assign | '(' expr_seq ')'
  expr_seq ::= expr_seq ',' expr
             | expr

  expr_assign ::= pattern '=' expr | ... all other expressions to expr_atom
  expr_atom ::= ... | proc_expr

  pattern ::= identifier | arraypattern | objectpattern

JavaScript parsing is done by acorn, and the naming in the grammar matches
those used in the acorn code.


Grammar for type annotation
===========================

::

  type_anno ::= %empty | ':' type
  type ::= type_var
         | top_type
         | named_type
         | array_type
         | tuple_type
         | sum_type
         | record_type
         | tagged_union_type
         
  type_var    ::= '?' identifier
  top_type    ::= '_'
  named_type  ::= identifier
  array_type  ::= '[' type '];
  tuple_type  ::= '(' type ',' type_list ')'
  record_type ::= '{' tagged_type_list '}'
  tagged_union_type ::= '<' tagged_type_list '>'

  sum_type ::= sum_type '+' type
             | type

  type_list ::= type_list ',' type
              | type

  tagged_type_list ::= tagged_type_list ',' tagged_type
                     | tagged_type

  tagged_type ::= identifier ':' type

